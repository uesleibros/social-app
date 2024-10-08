export default class FollowUserUseCase {
	constructor(userRepository, followerRepository) {
		this.userRepository = userRepository;
		this.followerRepository = followerRepository;
	}

	async execute({ gid, identifier, toFollowIdentifier }) {
    const existingUser = await this.userRepository.findByGID(gid);
    if (!existingUser)
      throw new Error("G-ID invalid.");

    const existingToFollowGID = await this.userRepository.findByIdentifier(toFollowIdentifier);
    if (!existingToFollowGID)
      throw new Error("User to follow doesn't exist.");

    const isFollowing = await this.followerRepository.exists(existingUser.id, existingToFollowGID.id);
    if (isFollowing)
    	throw new Error("You already is following him.");

    if (existingUser.id === existingToFollowGID.id)
      throw new Error("You can't follow you.");

    await this.followerRepository.create(existingUser.id, existingToFollowGID.id);
  }
}