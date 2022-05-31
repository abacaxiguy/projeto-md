import sys
from PyQt5.QtWidgets import QMainWindow, QApplication, QPushButton
from PyQt5.QtWidgets import QWidget, QGridLayout, QLabel


class App(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent) 
        self.setWindowTitle('Programinha')
        self.cw = QWidget()
        self.vezes = 0
        self.grid = QGridLayout(self.cw)
        self.setStyleSheet("background-color: #ff0000;color:white;")
        self.setFixedSize(370, 200)

        def adddale():
            self.vezes+=1
            self.texto.setText(str(self.vezes))

        self.btn = QPushButton('Fodase 🖕️')
        self.btn.clicked.connect(adddale)
        self.grid.addWidget(self.btn, 0, 0, 4, 4)
        
        self.texto = QLabel(str(self.vezes))
        self.grid.addWidget(self.texto, 5, 3, 1,1 )


        self.setCentralWidget(self.cw)



if __name__ == '__main__':
    qt = QApplication(sys.argv)
    app = App()
    app.show()
    qt.exec_()