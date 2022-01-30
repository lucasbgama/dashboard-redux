import { formInput } from "../components/Form";

const checkEmail = (email: string): string | undefined => {
    if (email === "") {
      return "Email is required."
    }
    return /^\S+@\S+\.\S+$/.test(email) ? undefined : "Invalid email.";
  }
  
const checkInputValidity = (input: formInput): formInput => {
    return {
      name: {
        value: input.name.value,
        errorMessage: input.name.value === "" ? "Name is required." : undefined,
      },
      email: {
        value: input.email.value,
        errorMessage: checkEmail(input.email.value),
      }
    }
}

export default checkInputValidity;