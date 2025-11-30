export function Footer() {
  return (
    <footer className="w-full bg-base-200 border-t border-white/10">
      <div className="w-full sm:w-[90%] max-w-[1200px] mx-auto py-4">
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} QuickTalk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
