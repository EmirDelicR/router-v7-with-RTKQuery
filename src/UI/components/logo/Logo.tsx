import { Image } from "@mantine/core";
import LogoPath from "@/assets/logo.png";

interface Props {
  height?: number;
}

export default function Logo({ height = 50 }: Readonly<Props>) {
  return <Image radius="md" h={height} w="auto" fit="contain" src={LogoPath} />;
}
