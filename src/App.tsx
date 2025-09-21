import AppContent from './components/AppContent';
import { ErrorBoundary } from './components/common';
import { AppProvider, ThemeProvider } from './context';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
