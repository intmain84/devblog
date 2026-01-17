import { FaGithub, FaGoogle } from "react-icons/fa";
import Button from "../common/Button";

const SocialAuth = () => {
  return (
    <div>
      <Button
        label="Continue with GitHub"
        type="button"
        icon={FaGithub}
        className="w-full text-white"
        outlined
        onClick={() => {}}
      />
      <Button
        label="Continue with GitHub"
        type="button"
        icon={FaGoogle}
        className="w-full text-white"
        outlined
        onClick={() => {}}
      />
    </div>
  );
};

export default SocialAuth;
