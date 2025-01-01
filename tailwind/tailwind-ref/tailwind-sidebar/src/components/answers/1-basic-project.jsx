export const SidebarClass1 = () => {
  return (
    <div className="flex h-screen">
      <div className="transition-all ease-in-out duration:500 w-4 md:w-96">
        Sidebar
      </div>
      {/* here it is always hidden and when md:block i.e. when it comes across medium device and beyond the block is triggered and the prev hidden is redundant, here instead of md:block if we use md:flex also will give us the same result */}
      <div className="bg-green-200 grow">Content</div>
    </div>
  );
};
