import { getUserLoader } from "@/store/globalState/globalApiSlice";
import { Welcome } from "@/UI/components/welcome/Welcome";
import { useNavigation } from "react-router";
import Loader from "@/UI/components/loader/Loader";

export default function HomePage() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Loader />;
  }
  return <Welcome />;
}

export function userLoader() {
  return getUserLoader();
}
