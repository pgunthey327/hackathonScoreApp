import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Rating,
  Stack,
} from '@mui/material';
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4  } from 'uuid';

// Configure client with IAM creds
const client = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

export default function RatingCard({ teamName, userName, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState(userName)

const handleSubmit = async () => {
  const payload = {
    team: teamName,
    rating,
    name: name,
  };

  const params = {
    TableName: "SharedValues",
    Item: {
      id: { S: uuidv4() },            // primary key
      team: { S: payload.team },
      rating: { N: String(payload.rating) },
      jname: { S: payload.name },
      createdAt: { S: new Date().toISOString() }, // optional but recommended
    },
  };

  const data = await client.send(new PutItemCommand(params));

  console.log("Submitted:", data);
  alert("Thanks for your feedback!");
  onSubmit();
};


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

          <TextField
            label="Your Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
          />

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
