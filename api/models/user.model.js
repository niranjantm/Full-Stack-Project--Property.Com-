import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAZlBMVEX///8zMzMjIyMuLi4gICApKSkdHR0AAAAmJiYaGhoYGBj8/Pze3t719fXGxsatra2Dg4OQkJDv7+89PT16enpXV1cRERHMzMxoaGhKSkrV1dVcXFzl5eWlpaUJCQm7u7uYmJhycnK2m1ENAAADHElEQVR4nO2aCZKjMAxFsWWDWRyzL2HN/S85JOlJV6cJeIJNd03pXYBfkqwvKXEcBEEQBEEQBEEQBEGQN+kqNcVxok5R+EMKUlVn1GWUMpeRdup+QIJMaADkAbDhcj5ag3IpeYKXeXqkBFmzZwlXRHZgMNJmUcOcFHE6SkOX8WUNswp/PEZD2LzUcC3QYzISv8jFh4pMHqDh5K1pIITF9jXIBtZFEFpZF6HcDQ2E19ZFbAZiDkVkWUP1rVEuiEgsi5jEtghoLIsotrNBiGfXQ8JSQwMp7TbvbqNJ3GG9VRHnQUeEsFuZlVY6uN2m+StE/Ip0pFqF6SqrIhydNkE8yzNFvTLQPCgtbyG9hndAa1eDE2l4B7VcElr5AOvrx2l1wrwF4oD5bjsUB2ylnb8uobReEVdUsKZBXI65EuQrsy4nR6wdNxUvYyGyQ84UssplmLwwU1akTn+yHYtQFSxo5y/BwhsBdpFOMviFsloWY1PC/QwR1d6Tl0GQjY68zJmCsrG3m0eNCx/f60OnqpkPf4UALYv5aZ7IvauD21hagBT/TAEr5oG669uGCEoFZEVyDp0op4/ocG6lXXx9ElC245x5GVUz56tZVLn7xdyC3LiEtHj2DPCHoj9FqZSyq9RFDM+lSgvDzyRtl+YIuGZihnC6ZCiiNWqn4fK1bgtm9EgQbx4lXqgw6Oqj1qC/xGCsYaSZ1oy9BGSmyiJ5MxlXXEN7UPR2HG6xMNM6E40p/zVmbkfhW6/zE2ZCxLgxU25h5Nqd6yx+K3ADHiLff593TBy79a5Ua3j7x85xdcDXIdhfFInGBryOgUe6ty6NVGa9sy7nytxt6GG+s01cp4rdG4Ccgn3e4dcmlrJzoXW8fBEGMDR1hyp70z84TcwNu2kMb1gpF7XZW2IUe/8og3uF+V/k0iTTL1FgNLfzo2CqWqA6OoRoEot3ivOUDWy1h4IIaG79RNH1F+L5Ar6FBICzwW0n+7/N3pCRiuuGcOa7jM5rOWOuS6Fp86lKD/1zTZhG53HspziOk2RSYxUd+30EQRAEQRAEQRAEQf4b/gDlVykl8yruYgAAAABJRU5ErkJggg=="
        
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;