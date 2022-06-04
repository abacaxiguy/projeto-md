import sys
from PyQt5.QtWidgets import QMainWindow, QApplication
from design import *
from helper import *


class Criptografia(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        super().setupUi(self)


if __name__ == '__main__':
    qt = QApplication(sys.argv)
    rsa = Criptografia()
    rsa.show()
    qt.exec_()
