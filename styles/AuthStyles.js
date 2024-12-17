import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F57C00",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 20,
  },
  logoSignUp: {
    fontSize: 36,
    color: "#4A369D",
    fontWeight: "bold",
  },
  containerSignUp: {
    paddingHorizontal: 30,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#4B358D",
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#F7931E",
    textAlign: "center",
    marginBottom: 50,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#F7931E",
    marginBottom: 25,
    fontSize: 18,
    color: "white",
  },
  inputSignUp: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonSignUp: {
    backgroundColor: '#ff8000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  loginText: {
    color: '#5a3d8a',
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
  },
  forgotPassword: {
    color: "white",
    textAlign: "right",
    marginBottom: 30,
  },
  linkText: {
    color: "#F7931E",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6C56C1",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  socialButton: {
    marginHorizontal: 20,
  },
  registerButton: {
    backgroundColor: "#6C56C1",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  registerText: {
    color: "#F7931E",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Verificacion
  subtitle: {
    fontSize: 18,
    color: '#4A369D',
    fontWeight: '500',
  },
  containerVerification: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  formContainer: {
    paddingVertical: 100,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
  },
  resendText: {
    color: '#5a3d8a',
    fontWeight: 'bold',
  },
});

export default styles;
