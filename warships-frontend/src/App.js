import styled from 'styled-components';

function App() {
  return (
    <AppContainer>
      This is the main app container
    </AppContainer>
  );
}

export default App;


const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
`
