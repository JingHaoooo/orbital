import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    height: 135,
    width: 360,
    alignSelf: 'center',
    marginTop: 30,
  },
  mentorsize: {
    fontSize: 50,
    padding: 20,
    color: 'darkblue',
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'orange',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 16,
  },
});