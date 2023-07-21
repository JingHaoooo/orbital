import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 48,
    width: '87%',
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#00BFFF',
    width: '20%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'orange',
    width: '100%',
    height: 48,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  moduleList: {
    marginTop: 10,
    marginBottom: 10,
  },
  moduleItem: {
    marginBottom: 5,
  },
  text: {
    paddingVertical: 10,
    alignContent: 'flex-start',
    fontSize: 18,
  },
  dropdownContainer1: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 20,
    zIndex: 2000,
  },
  dropdownContainer2: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownList: {
    backgroundColor: '#fafafa',
  },
  moduleBubbleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});