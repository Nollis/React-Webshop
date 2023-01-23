import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
    return <Box>
        <Typography variant="h2" fontWeight="bold" sx={{ mb: "5px"}}>{title}</Typography>
        <Typography variant="h5">{subtitle}</Typography>
    </Box>
}

export default Header;