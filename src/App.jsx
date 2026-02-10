import { useState } from 'react'
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material'
import RatingCard from './RatingCard'
import TeamStats from './TeamStats'

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
  const [showRating, setShowRating] = useState(false)
  const [userName, setUserName] = useState('')
  const [showNameDialog, setShowNameDialog] = useState(true)
  const [tempName, setTempName] = useState('')
  const [showStats, setShowStats] = useState(false)

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setUserName(tempName)
      setShowNameDialog(false)
    }
  }

  const handleTeamSelect = (selectedTeam) => {
    setTeam(selectedTeam)
    setShowRating(true)
  }

  const handleSubmitRating = () => {
    setShowRating(false)
    setTeam(TEAMS[0])
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6, position: 'relative' }}>
      <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
        <img
          src="/accenture.png"
          alt="Accenture Logo"
          style={{
            width: "100%",
            height: "22px",
            borderRadius: '8px'
          }}
        />
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Team Performance Rating
      </Typography>

      {!showNameDialog && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant={showStats ? "contained" : "outlined"}
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? 'Back to Rating' : 'View Leader Board'}
          </Button>
        </Box>
      )}

      <Dialog open={showNameDialog} onClose={() => {}} maxWidth="sm" fullWidth disableEscapeKeyDown>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Your Name"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNameSubmit}
            variant="contained"
            disabled={!tempName.trim()}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {showStats && !showNameDialog && <TeamStats onClose={() => setShowStats(false)} />}

      {!showNameDialog && !showStats && (
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="team-select-label">Select Team</InputLabel>
            <Select
              labelId="team-select-label"
              value={team}
              label="Select Team"
              onChange={(e) => handleTeamSelect(e.target.value)}
            >
              {TEAMS.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {showRating && !showStats && (
        <RatingCard teamName={team} userName={userName} onSubmit={handleSubmitRating} />
      )}
    </Container>
  )
}
