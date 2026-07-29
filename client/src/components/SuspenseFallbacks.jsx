const SkeletonBlock = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-2xl bg-[var(--color-bg-muted)] ${className}`}
  />
);

export const AuthPageSkeleton = () => (
  <div className="min-h-screen flex bg-[var(--color-bg-surface)] transition-colors duration-300">
    <div className="flex-1 flex flex-col px-6 sm:px-10 lg:px-14 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SkeletonBlock className="h-10 w-10 rounded-xl" />
          <SkeletonBlock className="h-6 w-28 rounded-lg" />
        </div>
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
      </div>

      <div className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-md space-y-5">
          <div className="space-y-3">
            <SkeletonBlock className="h-10 w-44 rounded-xl" />
            <SkeletonBlock className="h-5 w-64 rounded-lg" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-16 rounded-md" />
              <SkeletonBlock className="h-12 w-full rounded-2xl" />
            </div>

            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-20 rounded-md" />
              <SkeletonBlock className="h-12 w-full rounded-2xl" />
            </div>

            <SkeletonBlock className="h-12 w-full rounded-2xl" />
          </div>

          <div className="flex justify-center">
            <SkeletonBlock className="h-4 w-48 rounded-md" />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <SkeletonBlock className="h-4 w-20 rounded-md" />
        <SkeletonBlock className="h-4 w-16 rounded-md" />
        <SkeletonBlock className="h-4 w-12 rounded-md" />
      </div>
    </div>

    <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-[var(--color-bg-muted)]/40 px-10 py-12">
      <div className="w-full rounded-[2rem] border border-[var(--color-border-main)] bg-[var(--color-bg-surface)]/80 p-8 space-y-6">
        <SkeletonBlock className="h-10 w-3/5 rounded-2xl" />
        <SkeletonBlock className="h-5 w-4/5 rounded-lg" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <SkeletonBlock className="h-28 rounded-3xl" />
          <SkeletonBlock className="h-28 rounded-3xl" />
          <SkeletonBlock className="h-24 rounded-3xl col-span-2" />
        </div>
      </div>
    </div>
  </div>
);

export const DashboardShellSkeleton = () => (
  <div className="h-screen flex bg-(--color-bg-app) overflow-hidden">
    <aside className="hidden md:flex w-20 lg:w-64 shrink-0 flex-col border-r border-[var(--color-border-main)] bg-[var(--color-bg-surface)]">
      <div className="h-16 flex items-center gap-3 px-4 lg:px-6 border-b border-[var(--color-border-main)]">
        <SkeletonBlock className="h-8 w-8 rounded-lg" />
        <SkeletonBlock className="hidden lg:block h-5 w-24 rounded-lg" />
      </div>

      <div className="flex-1 p-3 space-y-2">
        <SkeletonBlock className="h-12 rounded-xl" />
        <SkeletonBlock className="h-12 rounded-xl" />
        <SkeletonBlock className="h-12 rounded-xl" />
        <SkeletonBlock className="h-12 rounded-xl" />
        <SkeletonBlock className="h-12 rounded-xl" />
      </div>

      <div className="border-t border-[var(--color-border-main)] p-3">
        <SkeletonBlock className="h-14 rounded-xl" />
      </div>
    </aside>

    <div className="flex-1 flex flex-col min-w-0">
      <header className="h-16 border-b border-[var(--color-border-main)] bg-[var(--color-bg-surface)] px-6 flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-36 rounded-md" />
          <SkeletonBlock className="h-3 w-28 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-9 w-9 rounded-lg" />
          <SkeletonBlock className="h-9 w-9 rounded-lg" />
          <SkeletonBlock className="h-9 w-9 rounded-lg" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-20 md:p-6 lg:p-8 md:pb-6 bg-(--color-bg-app)">
        <div className="space-y-6">
          <SkeletonBlock className="h-40 rounded-[1.75rem]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonBlock className="h-32 rounded-[1.5rem]" />
            <SkeletonBlock className="h-32 rounded-[1.5rem]" />
            <SkeletonBlock className="h-32 rounded-[1.5rem]" />
            <SkeletonBlock className="h-32 rounded-[1.5rem]" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <SkeletonBlock className="xl:col-span-2 h-80 rounded-[1.75rem]" />
            <SkeletonBlock className="h-80 rounded-[1.75rem]" />
          </div>

          <SkeletonBlock className="h-72 rounded-[1.75rem]" />
        </div>
      </main>
    </div>
  </div>
);
