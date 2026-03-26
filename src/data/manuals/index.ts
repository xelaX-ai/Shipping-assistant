import novaPoshta from "./nova-poshta";
import ukrPoshta from "./ukr-poshta";
import correspondence from "./correspondence";
import accessPasses from "./access-passes";
import dhl from "./dhl";

// Щоб додати новий мануал — створи файл у цій папці та імпортуй його тут
export const MANUALS = [novaPoshta, ukrPoshta, correspondence, accessPasses, dhl];
