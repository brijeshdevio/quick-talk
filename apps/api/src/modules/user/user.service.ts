import { User } from "./user.model";
import { UpdateProfileDto, ChangePasswordDto } from "./user.schema";
import { ApiError } from "../../utils/ApiError";

const PUBLIC_FIELDS = "username email avatar bio isOnline lastSeen";

export class UserService {
  // ─── Get own profile ─────────────────────────────────────
  static async getMe(userId: string) {
    const user = await User.findById(userId).select(PUBLIC_FIELDS);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  // ─── Get any user by ID ───────────────────────────────────
  static async getUserById(userId: string) {
    const user = await User.findById(userId).select(PUBLIC_FIELDS);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }

  // ─── Search users by username or email ───────────────────
  // Excludes the requesting user from results
  static async searchUsers(
    query: string,
    requestingUserId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    // Case-insensitive partial match on username or email
    const filter = {
      _id: { $ne: requestingUserId },
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    };

    const [users, total] = await Promise.all([
      User.find(filter)
        .select(PUBLIC_FIELDS)
        .skip(skip)
        .limit(limit)
        .sort({ username: 1 }),
      User.countDocuments(filter),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + users.length < total,
      },
    };
  }

  // ─── Update profile fields ────────────────────────────────
  static async updateProfile(userId: string, dto: UpdateProfileDto) {
    // If updating username — check uniqueness
    if (dto.username) {
      const taken = await User.findOne({
        username: dto.username,
        _id: { $ne: userId },
      });
      if (taken) throw new ApiError(409, "Username is already taken");
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: dto },
      { new: true, runValidators: true },
    ).select(PUBLIC_FIELDS);

    if (!updated) throw new ApiError(404, "User not found");
    return updated;
  }

  // ─── Called by socket on connect/disconnect ───────────────
  static async setOnlineStatus(userId: string, isOnline: boolean) {
    await User.findByIdAndUpdate(userId, {
      isOnline,
      ...(!isOnline && { lastSeen: new Date() }), // set lastSeen only on going offline
    });
  }
}
