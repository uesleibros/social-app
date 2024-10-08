"use client";

import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaPlus, FaCheck } from "react-icons/fa6";
import EditProfile from "@/presentation/components/Profile/EditProfile";
import Link from "next/link";

export default function ViewProfileActions({ me, user, isFollowing = false }) {
	const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
	const [following, setFollowing] = useState(isFollowing);

	async function followUser() {
		const req = await fetch("/api/services/follow", {
			method: "POST",
			headers: {
				"Authorization": `G-ID ${me.prisma.gid}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				identifier: me.prisma.identifier,
				toFollowIdentifier: user.identifier
			})
		});

		setFollowing(true);
	}

	async function unfollowUser() {
		const req = await fetch("/api/services/follow", {
			method: "DELETE",
			headers: {
				"Authorization": `G-ID ${me.prisma.gid}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				identifier: me.prisma.identifier,
				toFollowIdentifier: user.identifier
			})
		});
		setFollowing(false);
	}

	return (
		<div className="flex flex-wrap items-center gap-4">
			{((me && user) && me.prisma.identifier !== user.identifier) && (
				<>
					<Link href={`/messages/${user.id}`} className="py-2 px-2 rounded-full font-bold bg-gray-100 dark:bg-zinc-700 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-800">
					  <span className="select-none text-[11px] sm:text-xs text-gray-800 dark:text-white text-center">
					  	<AiOutlineMessage size={20} />
					  </span>
					</Link>
					<button onClick={following ? unfollowUser : followUser} className={`py-1 px-5 rounded-full font-bold transition duration-200 ${!following ? "bg-blue-500 hover:opacity-90 text-white dark:text-black" : "text-black dark:text-white bg-transparent border-2 border-blue-500 hover:border-transparent hover:bg-blue-500 hover:text-white dark:hover:text-black"}`}>
					  <span className="select-none text-[11px] sm:text-xs text-center flex items-center gap-2">
					  	{following ? (
					      <>
					        <FaCheck /> Following
								</>
				      ) : (
					      <>
					        <FaPlus /> Follow
								</>
							)}
					  </span>
					</button>
				</>
			)}
			{((me && user) && me.prisma.identifier === user.identifier) && (
				<>
					<button onClick={() => setIsOpenEditProfile(true)} className="py-1 px-5 rounded-full font-bold bg-gray-100 dark:bg-zinc-700 transition duration-200 hover:bg-gray-200 dark:hover:bg-zinc-800">
					  <span className="select-none text-[11px] sm:text-xs text-gray-800 dark:text-white text-center">
					  	Edit Profile
					  </span>
					</button>
					{isOpenEditProfile && (<EditProfile me={me} onClose={() => setIsOpenEditProfile(false)} />)}
				</>
			)}
		</div>
	);
}
