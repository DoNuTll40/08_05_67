
import { useContext } from "react";
import PersonContext from "../contexts/PersonContext";

export default function PersonAuth() {
  return useContext(PersonContext)
}