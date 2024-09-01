import { useState } from "react";
import { Button } from "../../../shared/components";

interface UserFilterProps {
  setUserFilterName: (name: string) => void;
}

export function UserFilter({ setUserFilterName }: UserFilterProps) {
  const [nameFilter, setNameFilter] = useState<string | undefined>();
  const onFilter = () => {
    setUserFilterName(nameFilter ?? "");
  };
  const onClear = () => {
    setNameFilter("");
    setUserFilterName("");
  };
  const cannotSearch = !nameFilter?.length;
  return (
    <div className="flex justify-end items-center gap-10 mt-20">
      <div className="flex gap-4 items-center">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Name:
        </label>
        <input
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Doe"
          required
        />
      </div>
      <Button label="Search" onClick={onFilter} disabled={cannotSearch} />
      <Button label="Clear" onClick={onClear} disabled={cannotSearch} />
    </div>
  );
}
