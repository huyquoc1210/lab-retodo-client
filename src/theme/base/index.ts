import type { ThemeOptions } from "@mui/material";

// Components
import components from "./components";

// Typography
import typography from "./typography";

const options: ThemeOptions = {
    components,
    shape: {
        borderRadius: 4,
    },
    typography,
};

export default options;
