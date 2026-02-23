using CarShowroom.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

namespace CarShowroom.Services.OnlineListingServices
{
    public class Hatla2eeScraper : IListingScraper
    {
        public static async Task<AddListingOnlineDTO> Scrape(string target)
        {
            var options = new ChromeOptions();
            options.BinaryLocation = @"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe";

            // --- KEY CHANGES ---
            options.AddArgument("--headless=new");
            options.AddArgument("--window-size=1920,1080");

            options.AddArgument("--disable-blink-features=AutomationControlled");
            options.AddArgument("--disable-gpu");
            options.AddArgument("--no-sandbox");
            options.AddArgument("--disable-dev-shm-usage");
            options.AddArgument("--disable-infobars");
            options.AddExcludedArgument("enable-automation");
            options.AddAdditionalOption("useAutomationExtension", false);
            options.PageLoadStrategy = PageLoadStrategy.Eager;
            options.AddUserProfilePreference("profile.managed_default_content_settings.images", 2);
            options.AddArgument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120");

            using var driver = new ChromeDriver(options);

            driver.Navigate().GoToUrl(target);

            driver.Manage().Timeouts().PageLoad = TimeSpan.FromMinutes(2);
            try
            {
                var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

                wait.Until(d =>
                d.FindElements(By.CssSelector("h1.font-bold.text-2xl.lg\\:text-3\\.5xl")).Count > 0);
            }
            catch (WebDriverTimeoutException)
            {
                throw new WebDriverTimeoutException();
            }

            string price = driver.FindElement(By.CssSelector(
                "span.leading-none.font-bold"
                )).Text.Trim().Replace(",", "");
            string? make = "";
            string? model = "";
            string? color = "";
            string? location = "";
            string? fuelType = "";
            string? description = "";
            var year = driver.FindElements(By.CssSelector(
            "span.rtl\\:text-right.font-medium.text-xs.lg\\:text-sm"
                ))[0].GetAttribute("textContent")?.Trim();
            string? mileage = "0";
            string? transmission = "";

            if (driver.FindElement(By.CssSelector("h1.font-bold.text-2xl.lg\\:text-3\\.5xl")).Text.Trim().Contains("New Cash or Installment"))
            {
                if (price.Contains("Price Not Available"))
                {
                    price = "0";
                }

                make = driver.FindElements(By.CssSelector("a.hover\\:text-foreground.transition-colors.text-gray-500 span"))[1].Text.Trim().Replace(" New", "");
                model = driver.FindElements(By.CssSelector("a.hover\\:text-foreground.transition-colors.text-gray-500 span"))[2].Text.Trim().Replace(" New", "").Replace(make + " ", "");
                transmission = driver.FindElements(By.CssSelector(
                    "span.rtl\\:text-right.font-medium.text-xs.lg\\:text-sm"
                ))[1].GetAttribute("textContent")?.Trim();

                fuelType = driver.FindElements(By.CssSelector(
                "span.rtl\\:text-right.font-medium.text-xs.lg\\:text-sm"
                    ))[2].GetAttribute("textContent")?.Trim();

            }
            else
            {
                make = driver.FindElements(By.CssSelector(
                "div.font-medium.border.border-gray-100.py-2.px-3.md\\:py-\\[10\\].w-full.flex.items-center.ltr\\:rounded-tr-lg.rtl\\:rounded-tl-lg"
                ))[0].Text.Trim();

                model = driver.FindElements(By.CssSelector(
                "div.font-medium.border.border-gray-100.py-2.px-3.md\\:py-\\[10\\].w-full.flex.items-center"
                 ))[1].Text.Trim();

                color = driver.FindElements(By.CssSelector(
                    "div.font-medium.border.border-gray-100.py-2.px-3.md\\:py-\\[10\\].w-full.flex.items-center"
                ))[3].Text.Trim();

                location = driver.FindElements(By.CssSelector(
                    "div.font-medium.border.border-gray-100.py-2.px-3.md\\:py-\\[10\\].w-full.flex.items-center"
                ))[6].Text.Trim();

                mileage = driver.FindElements(By.CssSelector(
                    "span.rtl\\:text-right.font-medium.text-xs.lg\\:text-sm"
                    ))[1].GetAttribute("textContent")?.Trim()[0..^3].Replace(",", "");
                transmission = driver.FindElements(By.CssSelector(
                    "span.rtl\\:text-right.font-medium.text-xs.lg\\:text-sm"
                ))[2].GetAttribute("textContent")?.Trim();

                fuelType = driver.FindElements(By.CssSelector(
                "span.rtl\\:text-right.font-medium.text-xs.lg\\:text-sm"
                ))[3].GetAttribute("textContent")?.Trim();

                description = driver.FindElement(By.CssSelector(
                "#description"
            )).Text.Trim();

            }

            var images = driver.FindElements(By.CssSelector("img"))
                .Select(el => el.GetAttribute("src"))
                .Where(src => src != null && src.Contains("legion-images.hatla2ee.com"))
                .Skip(1)
                .Take(3)
                .Distinct()
                .ToList();


            return new AddListingOnlineDTO.Builder()
                .SetMake(make)
                .SetModel(model)
                .SetYear(year!)
                .SetPrice(price)
                .SetMileage(mileage!)
                .SetDescription(description)
                .SetColor(color)
                .SetImages(images!)
                .SetTransmission(transmission!)
                .SetBodyType("Sedan")
                .SetFuelType(fuelType!)
                .SetLocation(location)
                .SetCoverImage(images[0]!)
                .SetSource(target)
                .Build();
        }
    }
}
