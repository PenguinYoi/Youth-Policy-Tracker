from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time

url = "https://www.leg.state.nv.us/App/NELIS/REL/83rd2025/Bills/List"

# Start browser
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get(url)

# Wait for JS to load (adjust if needed)
time.sleep(5)

soup = BeautifulSoup(driver.page_source, "lxml")
driver.quit()

# Now extract links
bill_links = []
for a in soup.find_all("a", href=True):
    if "/Bill/" in a["href"]:
        bill_links.append("https://www.leg.state.nv.us" + a["href"])

print("Found bill links:", len(bill_links))
