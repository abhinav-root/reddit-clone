import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";
import { useEffect, useState } from "react";
import { getJoinedCommunities } from "../_actions";

type SelectCommunityProps = {
  selectedCommunity: string;
  setSelectedCommunity: React.Dispatch<React.SetStateAction<string>>;
};

type Community = {
  id: string;
  name: string;
  logo: string | null;
};

export default function SelectCommunity({
  selectedCommunity,
  setSelectedCommunity,
}: SelectCommunityProps) {
  const [open, setOpen] = useState(false);
  const [loadingCommunities, setLoadingCommunities] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    async function loadCommunities() {
      try {
        setLoadingCommunities(true);
        const data = await getJoinedCommunities();
        setCommunities(data);
        setLoadingCommunities(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCommunities(false);
      }
    }

    loadCommunities();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center space-x-2">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedCommunity ? (
              communities.find(
                (community) => community.name === selectedCommunity
              )?.name
            ) : (
              <>{"Select a community"}</>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {loadingCommunities && (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
      </div>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search community..." className="h-9" />
          <CommandEmpty>No community found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {communities.map((community) => (
                <CommandItem
                  key={community.id}
                  value={community.name}
                  onSelect={(currentValue) => {
                    setSelectedCommunity(
                      currentValue === selectedCommunity ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {community.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCommunity === community.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
