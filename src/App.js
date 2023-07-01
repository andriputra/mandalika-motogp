import React from 'react';
import MobileOnly from './MobileOnly';

function App() {
  return (
    <div>
      <MobileOnly>
        <h2>Hanya tampil di mode mobile</h2>
      </MobileOnly>
    </div>
  );
}

export default App;
