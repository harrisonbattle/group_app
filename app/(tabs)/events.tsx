import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import QRCode from "react-native-qrcode-svg";

const { width, height } = Dimensions.get('window');

const halfInchInPixels = 80; 

interface EventQRCodeProps {
  eventId: string;
  eventName: string;
}

const EventQRCode: React.FC<EventQRCodeProps> = ({ eventId, eventName }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const eventData = JSON.stringify({ id: eventId, name: eventName });

  const handleGenerateQRCode = () => {
    setShowQRCode(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.secContainer}>
        {!showQRCode && (
          <Pressable
            onPress={handleGenerateQRCode}
            style={({ pressed }) => [
              styles.retakeButton,
              { backgroundColor: pressed ? '#193a32' : '#386C5F' }, 
            ]}
          >
            <Text style={styles.buttonText}>Generate QR Code</Text>
          </Pressable>
        )}
        {showQRCode && (
          <QRCode value={eventData} size={200} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#386C5F',
    justifyContent: 'center',
  },
  secContainer: {
    width: width - 0.5 * halfInchInPixels,  
    height: height - 1.5 * halfInchInPixels, 
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 246, 148, 0.5)',
    justifyContent: 'center',
    borderRadius: 25,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  code: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: '#666',
    backgroundColor: '#eaeaea',
  },
  retakeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16,  
    fontWeight: 'bold', 
  },
});

export default EventQRCode;
