import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { LieuCoach } from '../../screens/LieuCoach/lieuCoach';
import AbonnementCoach from '../../screens/AbonnementCoach/AbonnementCoach';
import { View } from 'native-base';
import { Button } from 'react-native';
import InvitePlayer from '../../screens/InvitePlayer/invitePlayer';
import { AuthContext } from '../../context/AuthContext';
import { PlayersCoach } from '../../screens/MyAccountCoach/PlayersCoach';
import CoachProfile from '../../screens/CoachProfile/CoachProfile';
import { DefiCoach } from '../../screens/DefiCoach/defiCoach';
import { ProgCoach } from '../../screens/ProgCoach/progCoach';
import { EventCoach } from '../../screens/EventCoach/eventCoach';
import CompetenceScreen from '../../screens/manageCompetences/CompetenceScreen';
import { Statistic } from '../../screens/Statistics/statistic';
import { SeanceCoach } from "../../screens/SeanceCoach/seanceCoach";

const Drawer = createDrawerNavigator();

const Deconnexion = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => {
          logout();
        }}
        title='Deconnexion'
      />
    </View>
  );
};

export default function CoachNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName='Mes joueurs'
      screenOptions={{
        headerStyle: { backgroundColor: '#00BFFF' },
        headerTintColor: '#fff',
      }}
    >

      <Drawer.Screen name='Mon compte' component={CoachProfile} />
      <Drawer.Screen name='Mes joueurs' component={PlayersCoach} />
      <Drawer.Screen name='Mes lieux' component={LieuCoach} />
      <Drawer.Screen name='Mon abonnement' component={AbonnementCoach} />
      <Drawer.Screen name='Mes programmes' component={ProgCoach} />
      <Drawer.Screen name='Mes défis' component={DefiCoach} />
      <Drawer.Screen name='Mes évenements' component={EventCoach} />
        <Drawer.Screen name="Mes Séances" component={SeanceCoach} />
      <Drawer.Screen name='Mes competences' component={CompetenceScreen} />
      <Drawer.Screen name='Mes statistiques' component={Statistic} />
      <Drawer.Screen name='Inviter joueur' component={InvitePlayer} />
      <Drawer.Screen name='Deconnexion' component={Deconnexion} />

    </Drawer.Navigator>
  );
}
