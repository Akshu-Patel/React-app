import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const usePasswordToggle = () => {
    const [visible, setVisible] = useState(true);

    const Icon = (
        <FontAwesomeIcon
            icon={visible ? "eye-slash" : "eye"}
            onClick={() => setVisible(!visible)}
        />
    );

    const InputType = visible ? "text" : "password";

    return [InputType, Icon];
};

export default usePasswordToggle;