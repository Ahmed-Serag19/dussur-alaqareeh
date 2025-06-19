import { Globe, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLanguage from "@/hooks/useLanguage";
import useToggle from "@/hooks/useToggle";

const LANGUAGES = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇺🇸" },
] as const;

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { value: isOpen, setTrue: open, setFalse: close } = useToggle();

  const currentLang =
    LANGUAGES.find((lang) => lang.code === currentLanguage) || LANGUAGES[0];

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    close();
  };

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(isOpen) => (isOpen ? open() : close())}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-[2px] sm:gap-1 md:gap-2 h-9 px-3 cursor-pointer hover:text-blue-800  bg-white/10 backdrop-blur-sm border border-white/20 text-black hover:bg-white/20 transition-all duration-300"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{currentLang.flag}</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 bg-white/95 backdrop-blur-sm border border-gray-200/50"
      >
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-100/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </div>
            {currentLanguage === language.code && (
              <Check className="h-4 w-4 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
