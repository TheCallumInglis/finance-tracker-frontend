import { LinearProgress, Typography, Box } from '@mui/material';

interface ProgressBarProps {
  value: number;
  maxValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;

  return (
    <Box my={2}>
      <Typography>{`Spent: £${value.toFixed(2)} / £${maxValue.toFixed(2)}`}</Typography>
      <LinearProgress variant="determinate" value={percentage} />
    </Box>
  );
};

export default ProgressBar;