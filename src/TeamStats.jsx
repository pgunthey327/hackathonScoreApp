import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Button,
} from '@mui/material'
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"

const client = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

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

export default function TeamStats({ onClose }) {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const params = {
          TableName: "SharedValues",
        }

        const data = await client.send(new ScanCommand(params))
        const items = data.Items || []

        // Calculate average ratings by team
        const teamStats = {}
        TEAMS.forEach((team) => {
          teamStats[team] = { total: 0, count: 0, average: 0 }
        })

        items.forEach((item) => {
          const teamName = item.team?.S
          const rating = parseInt(item.rating?.N || 0)

          if (teamName && teamStats[teamName]) {
            teamStats[teamName].total += rating
            teamStats[teamName].count += 1
          }
        })

        // Calculate averages and prepare display data
        const statsArray = TEAMS.map((team) => ({
          team,
          count: teamStats[team].count,
          average: teamStats[team].count > 0
            ? (teamStats[team].total / teamStats[team].count).toFixed(2)
            : 'N/A',
        })).sort((a, b) => {
          const avgA = parseFloat(a.average) || 0
          const avgB = parseFloat(b.average) || 0
          return avgB - avgA
        })

        setStats(statsArray)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching stats:", err)
        setError("Failed to load Leader Board")
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Card elevation={4}>
        <CardContent>
          <Typography color="error">{error}</Typography>
          <Button onClick={onClose} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
          Team Average Scores
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Team</strong></TableCell>
                <TableCell align="right"><strong>Average Score</strong></TableCell>
                <TableCell align="right"><strong>Ratings Count</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((row) => (
                <TableRow key={row.team}>
                  <TableCell>{row.team}</TableCell>
                  <TableCell align="right">
                    <strong>{row.average}</strong>
                  </TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={onClose} variant="contained" sx={{ mt: 3, width: '100%' }}>
          Back to Rating
        </Button>
      </CardContent>
    </Card>
  )
}
