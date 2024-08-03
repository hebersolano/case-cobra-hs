import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Description, Radio, RadioGroup, Label as RGLabel } from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/lib/validators/option-validator";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { OptionsCaseT } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";

type configFormProps = {
  options: OptionsCaseT;
  setOptions: Dispatch<SetStateAction<OptionsCaseT>>;
};

function ConfigurationForm({ options, setOptions }: configFormProps) {
  return (
    <ScrollArea className="relative flex-1 overflow-auto">
      <div
        aria-hidden="true"
        className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background pointer-events-none"
      />

      <div className="px-8 pb-12 pt-8">
        <h2 className="tracking-tight font-bold text-3xl ">customize your case</h2>

        <div className="w-full h-px bg-border my-6" />

        <div className="relative mt-4 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <RadioGroup
              value={options.color}
              onChange={(val) => {
                setOptions((prev) => ({ ...prev, color: val }));
              }}
            >
              <RGLabel>Color: {options.color.label}</RGLabel>
              <div className="mt-3 flex items-center space-x-3">
                {COLORS.map((color) => (
                  <Radio
                    key={color.label}
                    value={color}
                    className={({ checked }) =>
                      cn(
                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none border-2 border-transparent dark:border-[3px]",
                        {
                          [`border-${color.tw} dark:shadow-[0_0px_0px_2px_rgba(255,255,255,1)]`]:
                            checked,
                        },
                        "dark:border-foreground"
                      )
                    }
                  >
                    <span
                      className={cn(
                        `bg-${color.tw}`,
                        "h-8 w-8 rounded-full border border-black border-opacity-10"
                      )}
                    />
                  </Radio>
                ))}
              </div>
            </RadioGroup>
            <div className="relative flex flex-col gap-3 w-full">
              <Label>Model</Label>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    role="combobox"
                    className="w-full bg-background-second text-foreground"
                  >
                    {options.model.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {MODELS.options.map((model) => (
                    <DropdownMenuItem
                      key={model.label}
                      className={cn("flex text-sm gap-1 items-center p-1.5 cursor-default ", {
                        "bg-accent": model.label === options.model.label,
                      })}
                      onClick={() => setOptions((prev) => ({ ...prev, model }))}
                    >
                      {
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4 invisible",
                            model.label === options.model.label && "visible"
                          )}
                        />
                      }
                      {model.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {[MATERIALS, FINISHES].map(({ name, options: selectableOpts }) => (
              <RadioGroup
                key={name}
                value={options[name]}
                onChange={(val) => setOptions((prev) => ({ ...prev, [name]: val }))}
              >
                <Label>{name.slice(0, 1).toUpperCase() + name.slice(1)}</Label>
                <div className="mt-3 space-y-4">
                  {selectableOpts.map((option) => (
                    <Radio
                      key={option.value}
                      value={option}
                      className={({ checked }) => {
                        return cn(
                          "relative block cursor-pointer rounded-lg bg-background-second hover:bg-background-second/50 px-6 py-4 shadow-sm border-2 border-transparent focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                          { "border-primary": checked }
                        );
                      }}
                    >
                      <span className="flex items-center">
                        <span className="flex flex-col text-sm ">
                          <RGLabel className="font-medium " as="span">
                            {option.label}
                          </RGLabel>

                          {option.description && (
                            <Description className="text-muted-foreground" as="span">
                              <span className="block sm:inline">{option.description}</span>
                            </Description>
                          )}
                        </span>
                      </span>

                      <Description
                        as="span"
                        className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                      >
                        <span className="font-medium ">{formatPrice(option.price)}</span>
                      </Description>
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default ConfigurationForm;
