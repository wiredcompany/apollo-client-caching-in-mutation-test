import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

const UPDATE_SELLER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      user {
        id
        name
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [mutateFunction] = useMutation(UPDATE_SELLER);

  const [name, setName] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h3>유저 리스트</h3>
      {data.users.map(({ id, name }) => (
        <div key={id}>{`id : ${id}, name: ${name}`}</div>
      ))}
      <h3>id가 2인 유저의 이름을 다음으로 변경</h3>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button
          disabled={!name}
          onClick={() =>
            mutateFunction({
              variables: {
                updateUserInput: {
                  id: 2,
                  name,
                },
              },
            })
          }
        >
          변경
        </button>
      </div>
    </div>
  );
}
