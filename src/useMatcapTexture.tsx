import { useState, useEffect, useMemo } from "react";
import { useTextureLoader } from "drei";

function getFormatString(format: number) {
  switch (format) {
    case 64:
      return "-64px";
    case 128:
      return "-128px";
    case 256:
      return "-256px";
    case 512:
      return "-512px";
    default:
      return "";
  }
}

const MATCAP_ROOT =
  "https://rawcdn.githack.com/emmelleppi/matcaps/9b36ccaaf0a24881a39062d05566c9e92be4aa0d";
const DEFAULT_MATCAP = "0404E8_0404B5_0404CB_3333FC";

interface InitialValuesObject {
  [name: string]: string;
}

export function useMatcapTexture(id: number | string = 0, format = 1024) {
  const [matcapList, setMatcapList] = useState<InitialValuesObject>({});

  const fileHash = useMemo(() => {
    if (typeof id === "string") {
      return id;
    } else if (typeof id === "number") {
      return matcapList[id];
    }
    return null;
  }, [id, matcapList]);

  const fileName = `${fileHash || DEFAULT_MATCAP}${getFormatString(
    format
  )}.png`;
  const url = `${MATCAP_ROOT}/${format}/${fileName}`;

  const matcapTexture = useTextureLoader(url);

  useEffect(() => {
    fetch(`${MATCAP_ROOT}/matcap-list.json`)
      .then((response) => response.json())
      .then((data) => setMatcapList(data));
  }, [setMatcapList]);

  return [matcapTexture, url];
}
