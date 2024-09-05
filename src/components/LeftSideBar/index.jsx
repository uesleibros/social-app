/**
 * LeftSidebar Component
 * 
 * This component represents the sidebar located on the left side of the layout.
 * It is used to display navigation links, user information, or any other
 * relevant content specific to the left side of the page.
 * 
 * Usage:
 * <LeftSidebar />
 */

import Image from "next/image";

export default function LeftSideBar() {
  return (
    <aside className="w-[250px] h-[100vh] overflow-y-auto p-4 bg-white text-black border-r border-gray-300">
      <div className="pt-4 flex flex-col gap-6">
        {/* Social App Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/icon.png" width={40} height={40} alt="Social App Logo" />
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2">
          <SidebarItem src="/icons/home.svg" text="Home" />
          <SidebarItem src="/icons/notifications.svg" text="Notifications" />
          <SidebarItem src="/icons/profile.svg" text="Profile" />
        </div>

        {/* Tweet Button */}
        <div className="mt-auto">
          <button className="p-3 w-full rounded-full font-bold bg-blue-500 text-white transition duration-200 hover:opacity-90">
            New Tide
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ src, text }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer p-2 rounded-full transition duration-200 hover:bg-gray-100">
      <Image src={src} width={25} height={25} alt={text} />
      <h3 className="text-xl font-semibold">{text}</h3>
    </div>
  );
}
