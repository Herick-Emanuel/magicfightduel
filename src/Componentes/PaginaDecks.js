import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Card, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, List, ListItem, Divider } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#F0E069",
  flexDirection: 'column'
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

const CommanderSearch = ({ onCommanderFound, landsAmount, setLandsAmount }) => {
  const [commanderName, setCommanderName] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!commanderName) {
      setError('O nome do comandante é obrigatório');
      return;
    }
    if (!landsAmount) {
      setError('A quantidade de terrenos é obrigatória');
      return;
    }

    try {
      const response = await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${commanderName}`);
      if (response.data) {
        setError('');
        onCommanderFound({ commander: response.data, landsAmount });
      } else {
        setError('Comandante não encontrado');
      }
    } catch (err) {
      setError('Erro ao buscar o comandante');
    }
  };

  return (
    <Box>
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
        label="Quantidade de Terrenos"
        variant="outlined"
        value={landsAmount}
        onChange={(e) => setLandsAmount(e.target.value)}
        error={!!error && !landsAmount}
        helperText={!!error && !landsAmount ? error : ''}
        fullWidth
      />
      <StyledButton variant="contained" onClick={handleSearch}>
        Buscar
      </StyledButton>
    </Box>
  );
};

const GenerateDeck = ({ commander, landsAmount, onDeckGenerated }) => {
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    try {
      const token = localStorage.getItem("token")
      const deckResponse = await axios.post('http://localhost:3001/cards/commander', {
        commanderName: commander.name,
        landsAmount: parseInt(landsAmount),
      }, { headers: { Authorization: 'Bearer ' + token } });
      if (deckResponse.data) {
        setError('');
        onDeckGenerated(deckResponse.data);
      } else {
        setError('Erro ao gerar o deck');
      }
    } catch (err) {
      setError('Erro ao gerar o deck');
    }
  };

  return (
    <Box>
      <StyledButton variant="contained" onClick={handleGenerate}>
        Gerar Deck
      </StyledButton>
    </Box>
  );
};

const DeckDetailsDialog = ({ open, onClose, deck }) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Detalhes do Deck</DialogTitle>
    <DialogContent>
      <Typography variant="h6">Comandante: {deck.commander.name}</Typography>
      <Typography variant="subtitle1">Quantidade de Terrenos: {deck.landsAmount}</Typography>
      <List>
        {deck.cards.map((card, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Box>
                <Typography variant="body1">
                  <strong>{card.name}</strong> - {card.type_line}
                </Typography>
                <Typography variant="body2">{card.oracle_text}</Typography>
              </Box>
            </ListItem>
            {index < deck.cards.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </DialogContent>
  </Dialog>
);

const PaginaDecks = () => {
  const [commanderData, setCommanderData] = useState(null);
  const [deckData, setDeckData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [landsAmount, setLandsAmount] = useState('');

  return (
    <BackgroundContainer>
      <FormContainer>
        <Typography component="h1" variant="h5" gutterBottom>
          Buscar Comandante de Magic
        </Typography>
        {!commanderData && (
          <CommanderSearch
            onCommanderFound={setCommanderData}
            landsAmount={landsAmount}
            setLandsAmount={setLandsAmount}
          />
        )}
        {commanderData && !deckData && (
          <GenerateDeck
            commander={commanderData.commander}
            landsAmount={landsAmount}
            onDeckGenerated={setDeckData}
          />
        )}
      </FormContainer>

      {deckData && (
        <DeckDetailsDialog open={openDialog} onClose={() => setOpenDialog(false)} deck={deckData} />
      )}
    </BackgroundContainer>
  );
};

export default PaginaDecks;
