import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);  // Tracks loading state
  const [hasError, setHasError] = useState(false);   // Tracks error state

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);  // Reset the error state if it's reloading
  };

  const handleLoadEnd = () => {
    setIsLoading(false); // Stop showing the loader when done loading
  };

  const handleLoadError = () => {
    setIsLoading(false);
    setHasError(true);   // Show error screen on failure
  };

  const reloadPage = () => {
    setHasError(false);  // Reset the error and trigger reload
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      {isLoading && !hasError && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}

      {!hasError ? (
        <WebView
          source={{ uri: 'https://www.pdfdrive.com' }}
          style={styles.webview}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleLoadError}  // Handle load errors
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load the page.</Text>
          <Button title="Retry" onPress={reloadPage} />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
});
