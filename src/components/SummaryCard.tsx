import { Card, CardContent, Typography } from '@mui/material';

interface SummaryCardProps {
  title: string;
  value: string;
  flag?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, flag = null }) => {
  const accentColour = flag === null ? 'primary' : flag ? 'error' : 'success';

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" color={accentColour}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
