import { useNavigate } from "react-router";

function useCustomNavigate() {
  const navigate = useNavigate();

  function handleNavigate(location) {
    navigate(location);
  }
  return { handleNavigate };
}

export default useCustomNavigate;
