import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function App() {
  return (
    <AppContainer>
      <Card sx={{ maxHeight: '500px' }}>
        <CardContent >
          <HeaderContainer>
            <img src='https://abs.twimg.com/hashflags/TheExpanse_Emoji/TheExpanse_Emoji.png'/>
            <AppHeader>Expanse Warships</AppHeader>
            <RightShip src='https://abs.twimg.com/hashflags/TheExpanse_Emoji/TheExpanse_Emoji.png'/>
          </HeaderContainer>

          <BodyContainer>
            
            <SubHeader>
              Team up to beat the aliens and other team's ships in the Expanse!

            </SubHeader>
            
            <ExpanseGif />
            
          </BodyContainer>  

        </CardContent>
    
      </Card>      
    </AppContainer>
  );
}

export default App;


const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`

const AppHeader = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: cyan;
  padding: 1rem;

`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  max-height: 500px;
`

const ExpanseGif = styled.img`
  content: url('https://i.kym-cdn.com/photos/images/original/002/357/452/53c.gif');
  padding: 1rem;
`

const SubHeader = styled.div`
  padding: 1rem;
  font-weight: bold;
`
// Created a styled component for the right ship because we want to orient it the opposite way of the original
const RightShip = styled.img`
  transform: rotate(270deg);
`