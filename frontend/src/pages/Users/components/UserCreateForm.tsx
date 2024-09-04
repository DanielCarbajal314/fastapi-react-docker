import { useState } from "react";
import { Button } from "../../../shared/components";
import { UserCreateRequest } from "../api/types";

interface UserCreateFormProps {
  createUser: (request: UserCreateRequest) => void;
  createUserIsLoading: boolean;
}

export function UserCreateForm({
  createUser,
  createUserIsLoading,
}: UserCreateFormProps) {
  const [userName, setUserName] = useState<string | undefined>();
  const onSave = () => {
    createUser({ name: userName ?? "" });
    setUserName("");
  };
  const cannotSave = !userName?.length;
  return (
    <div className="flex justify-end items-center gap-10 mt-20">
      <div className="flex gap-4 items-center">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Name:
        </label>
        <input
          value={userName}
          data-pw="new_user_input"
          onChange={(e) => setUserName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Doe"
          required
        />
      </div>
      <Button
        data-pw="new_user_button"
        label="Register"
        onClick={onSave}
        disabled={cannotSave && !createUserIsLoading}
        isLoading={createUserIsLoading}
      />
    </div>
  );
}
