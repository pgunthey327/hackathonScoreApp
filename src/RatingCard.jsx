import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Rating,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material'

export default function RatingCard({ teamName }) {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [anonymous, setAnonymous] = useState(true)

  const handleSubmit = () => {
    const payload = {
      team: teamName,
      rating,
      name: anonymous ? 'Anonymous' : name,
    }

    console.log('Submitted:', payload)
    alert('Thanks for your feedback!')
  }

  return (
    <Card elevation={4}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6">{teamName}</Typography>

          <Rating
            value={rating}
            onChange={(_, value) => setRating(value)}
            size="small"
            max={10}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
            }
            label="Submit anonymously"
          />

          {!anonymous && (
            <TextField
              label="Your Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Button
            variant="contained"
            size="large"
            disabled={rating === 0}
            onClick={handleSubmit}
          >
            Submit Rating
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
