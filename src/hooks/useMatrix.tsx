import { useState, useEffect } from 'react';
import { MatrixClient, MatrixEvent, Room } from 'matrix-js-sdk';
import { useAuth } from '@/hooks/useAuth';
import { initializeMatrixClient, getCurrentMatrixClient } from '@/utils/matrix';
import { supabase } from '@/integrations/supabase/client';

export const useMatrix = () => {
  const { user } = useAuth();
  const [client, setClient] = useState<MatrixClient | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initMatrix = async () => {
      if (!user) return;

      const matrixClient = await initializeMatrixClient(user.id);
      if (matrixClient) {
        setClient(matrixClient);
        setRooms(matrixClient.getRooms());

        // Use string literals for event names as per the updated API
        matrixClient.on('Room' as any, (room: Room) => {
          setRooms(matrixClient.getRooms());
        });

        matrixClient.on('Room.timeline' as any, (event: MatrixEvent) => {
          // Update rooms when new messages arrive
          setRooms(matrixClient.getRooms());
          
          // Update conversation metadata in Supabase
          if (event.getType() === 'm.room.message') {
            updateConversationMetadata(event);
          }
        });

        setIsInitialized(true);
      }
    };

    initMatrix();

    return () => {
      const currentClient = getCurrentMatrixClient();
      if (currentClient) {
        currentClient.stopClient();
      }
    };
  }, [user]);

  const updateConversationMetadata = async (event: MatrixEvent) => {
    if (!user) return;

    const roomId = event.getRoomId();
    if (!roomId) return;

    const room = client?.getRoom(roomId);
    if (!room) return;

    await supabase
      .from('matrix_conversations')
      .upsert({
        user_id: user.id,
        room_id: roomId,
        room_name: room.name,
        last_message: event.getContent().body,
        last_message_timestamp: new Date(event.getTs()).toISOString(),
        // Check if the room is a direct message room using the room's membership
        is_direct: Boolean(room.getMyMembership() === 'join' && room.getJoinedMemberCount() === 2),
      });
  };

  const sendMessage = async (roomId: string, content: string) => {
    if (!client) return;
    
    try {
      await client.sendTextMessage(roomId, content);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };

  const createDirectRoom = async (userId: string) => {
    if (!client) return;
    
    try {
      // Use a valid preset from the matrix-js-sdk
      const room = await client.createRoom({
        preset: 'private_chat' as any,
        invite: [userId],
        is_direct: true
      });
      return room;
    } catch (error) {
      console.error('Error creating direct room:', error);
      return null;
    }
  };

  return {
    client,
    rooms,
    isInitialized,
    sendMessage,
    createDirectRoom
  };
};
