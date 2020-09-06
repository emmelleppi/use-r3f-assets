import { useState, useEffect } from "react";
import { useTextureLoader } from "drei";
import { RepeatWrapping, Texture, Vector2 } from "three";

const NORMAL_ROOT =
  "https://rawcdn.githack.com/emmelleppi/normal-maps/f24c810fc1d86b5b1e5dfea914b668f70b5f2923";
const DEFAULT_NORMAL = "151_norm.JPG";

interface InitialValuesObject {
  [name: string]: string;
}

export function useNormalTexture(
  id = 0,
  { repeat = [1, 1], anisotropy = 1, offset = [0, 0] }
) {
  const [normalsList, setNormalsList] = useState<InitialValuesObject>({});
  const imageName = normalsList[id] || DEFAULT_NORMAL;
  const url = `${NORMAL_ROOT}/normals/${imageName}`;

  // @ts-expect-error
  const normalTexture: Texture = useTextureLoader(url);

  useEffect(() => {
    fetch(`${NORMAL_ROOT}/normals.json`)
      .then((response) => response.json())
      .then((data) => setNormalsList(data));
  }, [setNormalsList]);

  useEffect(() => {
    if (!normalTexture) return;
    normalTexture.wrapS = normalTexture.wrapT = RepeatWrapping;
    normalTexture.repeat = new Vector2(repeat[0], repeat[1]);
    normalTexture.offset = new Vector2(offset[0], offset[1]);
    normalTexture.anisotropy = anisotropy;
  }, [normalTexture, anisotropy, repeat, offset]);

  return [normalTexture, url];
}
