import Image from "next/image";
import ViewProfileActions from "@/presentation/components/Profile/ViewProfileActions";
import MediaModal from "@/presentation/components/Media/MediaModal";

export default function ProfileHeader({ user, verifiedName, me }) {
  return (
    <div>
      <div className={`relative min-h-[200px] ${!user.bannerUrl && "bg-blue-500"}`}>
        {user.bannerUrl && (<MediaModal className="object-cover select-none cursor-pointer" quality={100} src={user.bannerUrl} fill={true} alt="Profile Banner" />)}       
      </div>
      <div className="relative border-b themed-border bg-white dark:bg-black">
        <div className="px-4">
          <div className="flex max-lg:flex-col gap-3">
            <div className="z-10 -mt-10 flex justify-between">
              <div>
                <MediaModal className="relative rounded-full object-cover select-none border-4 border-white dark:border-black cursor-pointer" src={user.avatarUrl} width={150} height={150} quality={100} alt="Profile Picture" />
              </div>
              <div className="lg:hidden mt-[60px]">
                <ViewProfileActions user={user} me={me} />
              </div>
            </div>
            <div className="mt-2 w-full">
              <div className="flex gap-4 w-full items-center max-lg:items-start justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <h3 className="font-bold text-gray-800 dark:text-white text-2xl">{user.name}</h3>
                    {verifiedName.length > 0 && (
                      <Image className="select-none" src={`/badges/${verifiedName}.png`} width={25} height={25} alt={verifiedName} />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-zinc-500">{user.identifier}</p>
                </div>
                <div className="lg:visible max-lg:hidden">
                  <ViewProfileActions user={user} me={me} />
                </div>
              </div>
              <div className="flex mt-3 max-lg:mt-2 gap-4">
                <span className="text-gray-700 transition duration-200 hover:underline cursor-pointer dark:text-white text-sm"><strong>{user.followers.length}</strong> followers</span>
                <span className="text-gray-700 transition duration-200 hover:underline cursor-pointer dark:text-white text-sm"><strong>{user.following.length}</strong> following</span>
                <span className="text-gray-700 dark:text-white text-sm"><strong>{user.posts.length}</strong> posts</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 w-full">
              <h3 className="text-xs text-zinc-600 font-bold select-none border-b border-gray-200 dark:border-zinc-800">About Me</h3>
              <div className="mt-5">
                <p className="text-sm">{user.bio || "Nothing about me."}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-4 mt-[15px] flex-wrap gap-2 items-center mt-auto">
          <p className="font-semibold select-none text-sm p-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer border-b-4 border-blue-500">Tides</p>
          <p className="font-semibold text-zinc-500 select-none text-sm p-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer">Replies</p>
        </div>
      </div>
    </div>
  );
}
