import { useState } from 'react'
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material'
import RatingCard from './RatingCard'

const TEAMS = [
  'Team Alpha',
  'Team Bravo',
  'Team Charlie',
  'Team Delta',
  'Team Echo',
  'Team Foxtrot',
  'Team Golf',
  'Team Hotel',
  'Team India',
  'Team Juliett',
]

export default function App() {
  const [team, setTeam] = useState(TEAMS[0])

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Team Performance Rating
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="team-select-label">Select Team</InputLabel>
          <Select
            labelId="team-select-label"
            value={team}
            label="Select Team"
            onChange={(e) => setTeam(e.target.value)}
          >
            {TEAMS.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <RatingCard teamName={team} />
    </Container>
  )
}
