import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [selectedSite, setSelectedSite] = useState(null); // Tracks selected website
  const [isLoading, setIsLoading] = useState(false);  // Tracks loading state
  const [hasError, setHasError] = useState(false);    // Tracks error state

  // List of websites for user to select
  const websites = [
    { name: 'PDF Drive', url: 'https://www.pdfdrive.com' },
    { name: 'Read Any Book', url: 'https://www.readanybook.online' },
    { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
  ];

  // Function to handle website selection
  const handleSelectSite = (siteUrl) => {
    setSelectedSite(siteUrl);
    setIsLoading(true);  // Start loading the selected website
    setHasError(false);  // Reset any previous error state
  };

  // Function to handle back to home
  const handleGoHome = () => {
    setSelectedSite(null);  // Go back to the website selection (home)
    setIsLoading(false);
  };

  const handleLoadStart = () => setIsLoading(true);
  const handleLoadEnd = () => setIsLoading(false);
  const handleLoadError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View style={styles.container}>
      {selectedSite ? (
        // WebView screen (after a site is selected)
        <View style={styles.webviewContainer}>
          {isLoading && !hasError && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading...</Text>
            </View>
          )}

          {!hasError ? (
            <WebView
              source={{ uri: selectedSite }}
              style={styles.webview}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onError={handleLoadError}
            />
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load the page.</Text>
              <Button title="Retry" onPress={() => handleSelectSite(selectedSite)} />
            </View>
          )}

          {/* Back button to return to the home screen */}
          <TouchableOpacity style={styles.backButton} onPress={handleGoHome}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Home screen with the list of websites to choose from
        <View style={styles.homeContainer}>
          <Text style={styles.title}>Choose a Website</Text>
          {websites.map((site, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleSelectSite(site.url)}>
              <Text style={styles.buttonText}>{site.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
    marginTop: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
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
  backButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
