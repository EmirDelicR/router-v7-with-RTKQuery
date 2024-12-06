import { useNavigate } from "react-router";
import { Button } from "@mantine/core";

export default function HomeButton() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/", { viewTransition: true });
  };
  return (
    <Button variant="outline" size="md" mt="xl" onClick={goToHomePage}>
      Get back to home page
    </Button>
  );
}
