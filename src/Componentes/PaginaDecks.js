import React, { useReducer, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, List, ListItem, Divider, Paper } from '@mui/material';
import { styled } from '@mui/system';


const BackgroundContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#F0E069",
});

const FormContainer = styled("div")({
  width: "500px",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
  position: "relative",
});

const StyledButton = styled(Button)({
  background: "#EDD78E",
  width: "100px",
  color: "#fff",
  fontWeight: "bold",
  padding: "10px 0",
  borderRadius: "25px",
  marginTop: "20px",
  "&:hover": {
    background: "#EBB467",
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    "& fieldset": {
      borderColor: "#F0E069",
    },
    "&:hover fieldset": {
      borderColor: "#EDD38E",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#EBE43D",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#EDD38E",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#EBE43D",
  },
});

const PaginaDecks = () => {
  const [commanderName, setCommanderName] = useState('');
  const [landsAmount, setLandsAmount] = useState('');
  const [commanderData, setCommanderData] = useState(null);
  const [deckData, setDeckData] = useState(null);
  const [error, setError] = useState('');

  const setLands = (value) => {
    let onlyNumber = value.replace(/\D/g, '')
    setLandsAmount(onlyNumber)
  }


  const handleSearch = async () => {
    if (!commanderName) {
      setError('O nome do comandante é obrigatório');
      return;
    }

    if (!landsAmount) {
      setError('O nome do comandante é obrigatório');
      return;
    }

    await handleGenerateDeck({ name: commanderName, lands: landsAmount })


    // try {
    //   const response = await axios.get(`/cards/commander${commanderName}`);
    //   if (response.data) {
    //     setCommanderData(response.data);
    //     setError('');
    //     await handleGenerateDeck(response.data);
    //   } else {
    //     setError('Comandante não encontrado');
    //     setCommanderData(null);
    //     setDeckData(null);
    //   }
    // } catch (err) {
    //   setError('Erro ao buscar o comandante');
    //   setCommanderData(null);
    //   setDeckData(null);
    // }
  };

  const handleGenerateDeck = async (commander) => {
    try {
      // setar o token na requisição
      const deckResponse = await axios.post(`http://localhost:3000/cards/commander`, {
        commanderName: commander.name,
        landsAmount: commander.lands
      });
      if (deckResponse.data) {
        setDeckData(deckResponse.data);
      } else {
        setError('Erro ao gerar o deck');
      }
    } catch (err) {
      setError('Erro ao gerar o deck');
      setDeckData(null);
    }
  };

  return (
    <BackgroundContainer>
      <FormContainer>
        <Typography component="h1" variant="h5" gutterBottom>
          Buscar Comandante de Magic
        </Typography>
        <StyledTextField
          label="Nome do Comandante"
          variant="outlined"
          value={commanderName}
          onChange={(e) => setCommanderName(e.target.value)}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <StyledTextField
          label="Quantidade de terrenos"
          variant="outlined"
          value={landsAmount}
          onChange={(e) => setLands(e.target.value)}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <StyledButton variant="contained" onClick={handleSearch}>
          Buscar
        </StyledButton>

        {commanderData && (
          <Box mt={4} width="100%">
            <Typography variant="h6">Detalhes do Comandante:</Typography>
            <Typography>Nome: {commanderData.name}</Typography>
            <Typography>Tipo: {commanderData.type_line}</Typography>
            <Typography>Descrição: {commanderData.oracle_text}</Typography>
          </Box>
        )}

        {deckData && (
          <Box mt={4} width="100%">
            <Typography variant="h6">Deck Gerado:</Typography>

            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
              <Typography variant="subtitle1">JSON do Deck:</Typography>
              <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '4px' }}>
                {JSON.stringify(deckData, null, 2)}
              </pre>
            </Paper>

            <Typography variant="subtitle1">Cartas no Deck:</Typography>
            <List>
              {deckData.cards.map((card, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <Box>
                      <Typography variant="body1">
                        <strong>{card.name}</strong> - {card.type_line}
                      </Typography>
                      <Typography variant="body2">{card.oracle_text}</Typography>
                    </Box>
                  </ListItem>
                  {index < deckData.cards.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </FormContainer>
    </BackgroundContainer>
  );
};

export default PaginaDecks;
