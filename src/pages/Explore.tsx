import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { Post } from "../components/Post";
import { Tweet } from "../@types";
import { useAppSelector } from "../store/hooks";

export function Explore() {
  const { user } = useAppSelector((state) => state.userLogged);
  const trends = useAppSelector((state) => state.trends.trends);
  const { users } = useAppSelector((state) => state.usersList);

  return (
    <DefaultLayout>
      <h2>Assuntos do Momento</h2>
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>
            <strong className="trend-topic">{trend.topic}</strong>
            <p className="trend-posts">
              {trend.posts.length} {trend.posts.length > 1 ? "posts" : "post"}
            </p>
            <ul>
              {trend.posts.map((tweet: Tweet, tweetIndex: number) => {
                const tweetUser = users.find(
                  (user) => user.id === tweet.userId
                );
                if (!tweetUser) return null; // Se não encontrar o usuário, não renderiza o tweet

                return (
                  <li key={tweetIndex}>
                    <Post
                      tweet={tweet}
                      tweetUser={tweetUser}
                      isOwnTweet={tweetUser.id === user.id}
                      userLogged={user}
                      openModal={() => {}}
                      closeModal={() => {}}
                    />
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
}
